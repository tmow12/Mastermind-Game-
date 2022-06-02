CREATE TABLE "users" (
    "username" varchar(100) NOT NULL UNIQUE,
    "score" integer NOT NULL,
    CONSTRAINT "users_pk" PRIMARY KEY ("username")
) WITH (
    OIDS=FALSE
);