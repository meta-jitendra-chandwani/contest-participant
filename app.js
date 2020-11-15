var express = require("express");
var app = express();
var router = express.Router();
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./application.properties');
var ConnectionFactory = require('./connectionFactory')
const { Client } = require('pg');


process.on('uncaughtException', (err) => {
    console.debug("UNCAUGHT EXCEPTION! Error: ")
    console.debug(err)
})

const client = new Client({
    user: ConnectionFactory.user,
    host: ConnectionFactory.host,
    database: ConnectionFactory.databaseName,
    password: ConnectionFactory.password,
    port: ConnectionFactory.port,
});

client.connect();

//Handling unhandled promise rejections in the application
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:')
    console.log(promise)
    console.log('reason:')
    console.log(reason)
});

router.get("/contest", async (req, response, next) => {
    try {
        let charges = properties.get("contest_charges");
        let userId = req.query.userId;
        let discount = req.query.discount;
        if (!discount) {
            discount = 20; // in case discount is not entered
        }
        console.log("Discount applied - " + discount + "%");
        let chargesAfterDiscount = charges * (100 - discount) / 100;
        console.log("Amount after " + discount + "% discount - " + chargesAfterDiscount);
        let userProfileQuery = 'Select * from user_wallet uw inner join wallet w on uw.wallet_id = w.id inner join user_profile up on up.id = uw.user_profile_id where uw.user_profile_id = ' + userId + ' and up.is_active = true order by w.priority';
        client.query(userProfileQuery, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            var sortable = res.rows;
            let batchUpdateQuery = [];
            for (let index = 0; index < sortable.length; index++) {
                const element = sortable[index];
                let walletAmount = element['wallet_amount'];
                if ((element['usage_limit'] * chargesAfterDiscount / 100) <= walletAmount) {
                    element['wallet_amount'] = element['wallet_amount'] - (element['usage_limit'] * chargesAfterDiscount / 100)
                    chargesAfterDiscount = chargesAfterDiscount - (element['usage_limit'] * chargesAfterDiscount / 100);
                } else {
                    element['wallet_amount'] = element['wallet_amount'] - walletAmount;
                    chargesAfterDiscount = chargesAfterDiscount - walletAmount;
                }
                let updateWalletAmount = "update user_wallet set wallet_amount = " + element['wallet_amount'] + " where user_profile_id = " + element['user_profile_id'] + " and wallet_id = " + element['wallet_id'];

                batchUpdateQuery.push(updateWalletAmount);
            }
            if (chargesAfterDiscount !== 0) {
                console.log("Not Enough amount.")
                return response.status(409).json({ "status": "Failed", "message": "Insufficient balance." })
            } else {
                // to update wallet amount
                batchUpdateQuery.forEach(element => {
                    client.query(element);
                });
            }
            return response.status(200).json({ "status": "Success", "message": "Thank you for participation." });
        });
    }
    catch (err) {
        return response.json({ 'error': true, 'message': "Error occured.." + err });
    }
})

app.use("/", router);

app.listen("3001", function () {
    console.log("Listening on PORT - 3001")
});


module.exports = app;