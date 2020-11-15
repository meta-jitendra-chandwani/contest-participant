CREATE TABLE public.user_profile (
    id serial NOT NULL,
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default",
    username character varying(20) COLLATE pg_catalog."default" NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    CONSTRAINT "userProfile_pkey" PRIMARY KEY (id),
    CONSTRAINT "userProfile_username_key" UNIQUE (username)
) WITH (OIDS = FALSE);


CREATE TABLE public.wallet (
    id serial NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    description character varying(250) COLLATE pg_catalog."default",
    is_active boolean NOT NULL DEFAULT true,
    usage_limit numeric(3, 0) NOT NULL DEFAULT 100,
    priority numeric(2, 0) NOT NULL DEFAULT 1,
    CONSTRAINT wallet_pkey PRIMARY KEY (id)
) WITH (OIDS = FALSE);


CREATE TABLE public.user_wallet (
    id integer NOT NULL,
    user_profile_id integer NOT NULL,
    wallet_id integer NOT NULL,
    wallet_amount integer NOT NULL DEFAULT 0,
    CONSTRAINT user_wallet_primary_key PRIMARY KEY (id),
    CONSTRAINT user_profile_foriegn_key FOREIGN KEY (user_profile_id) REFERENCES public.user_profile (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT wallet_foriegn_key FOREIGN KEY (wallet_id) REFERENCES public.wallet (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) WITH (OIDS = FALSE);


INSERT INTO public.user_profile(
        id,
        first_name,
        last_name,
        username,
        is_active
    )
VALUES (2, 'User', 'Two', 'user_2', 't'),
    (3, 'User', 'Three', 'user_3', 't'),
    (1, 'User', 'One', 'user_1', 't'),
    (4, 'User', 'Four', 'user_4', 't'),
    (5, 'User', 'Five', 'user_5', 't'),
    (6, 'User', 'Six', 'user_6', 't'),
    (7, 'User', 'Seven', 'user_7', 't'),
    (8, 'User', 'Eight', 'user_8', 't'),
    (9, 'User', 'Nine', 'user_9', 't'),
    (10, 'User', 'Ten', 'user_10', 't');


INSERT INTO public.wallet(
        id,
        name,
        description,
        is_active,
        usage_limit,
        priority
    )
VALUES (
        2,
        'Bonus',
        'Incentive given by MoooFarm on Depositing Money. Only 10% of Entry Fee\r\ncan be used from Bonus Bucket',
        'true',
        10,
        1
    ),
    (
        1,
        'Deposit',
        'Added by user from his bank account (or paytm, etc.)',
        'true',
        100,
        2
    ),
    (
        3,
        'Winnings',
        'After availing a service, if a user wins money in a scratch card, it gets added in the winning Bucket',
        'true',
        100,
        3
    );

    
INSERT INTO public.user_wallet(id, user_profile_id, wallet_id, wallet_amount)
VALUES (13, 5, 1, 231),
    (14, 5, 2, 221),
    (15, 5, 3, 134),
    (16, 6, 1, 554),
    (17, 6, 2, 77),
    (18, 6, 3, 550),
    (19, 7, 1, 210),
    (20, 7, 2, 234),
    (21, 7, 3, 345),
    (22, 8, 1, 123),
    (23, 8, 2, 983),
    (24, 8, 3, 120),
    (25, 9, 1, 110),
    (26, 9, 2, 100),
    (27, 9, 3, 190),
    (28, 10, 1, 240),
    (29, 10, 2, 234),
    (30, 10, 3, 555),
    (3, 1, 3, 172),
    (5, 2, 2, 180),
    (6, 2, 3, 600),
    (8, 3, 2, 96),
    (9, 3, 3, 204),
    (4, 2, 1, 100),
    (7, 3, 1, 100),
    (1, 1, 1, 120),
    (2, 1, 2, 60),
    (11, 4, 2, 202),
    (12, 4, 3, 84),
    (10, 4, 1, 100);