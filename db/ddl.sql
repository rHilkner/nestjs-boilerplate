create type user_role as enum ('CUSTOMER', 'ADMIN');

drop table app_user;
create table app_user
(
    id            uuid                         default gen_random_uuid(),
    email         varchar(255) unique not null,
    password_hash varchar(255)        not null,
    role          user_role           not null,
    created_dt    timestamp           not null default current_timestamp,
    created_by    varchar(255)        not null,
    updated_dt    timestamp           not null default current_timestamp,
    updated_by    varchar(255)        not null
);
create index ix_app_user_1 on app_user (email);

-- SYSTEM BASE TABLES

drop table api_session;
create table api_session
(
    id               uuid               default gen_random_uuid()
        constraint pk_api_session primary key,
    user_id          uuid      not null, -- fk
    token            text      not null,
    ip_address       text,
    start_dt         timestamp not null,
    last_activity_dt timestamp not null,
    -- Audit columns
    created_dt       timestamp not null default now(),
    created_by       text      not null,
    updated_dt       timestamp not null default now(),
    updated_by       text      not null
);
create index ix_api_session_1 on api_session (token);

drop table call_log;
create table call_log
(
    id               uuid               default gen_random_uuid()
        constraint pk_call_log primary key,
    transaction_id   text      not null,
    user_id          uuid, -- fk, redundant (api_session.user_id)
    api_session_id   uuid, -- fk
    url              text,
    ip               text,
    method           text,
    endpoint         text,
    parameters       text,
    request_body     text,
    request_headers  text,
    http_status      text,
    response_body    text,
    response_headers text,
    start_dt         timestamp not null,
    end_dt           timestamp,
    -- Audit columns
    created_dt       timestamp not null default now(),
    created_by       text      not null,
    updated_dt       timestamp not null default now(),
    updated_by       text      not null
);
create index fk_call_log_1 on call_log (user_id);
create index fk_call_log_2 on call_log (api_session_id);

drop table error_log;
create table error_log
(
    id                  uuid               default gen_random_uuid()
        constraint pk_error_log primary key,
    user_id             uuid, -- fk, redundant
    call_log_id         uuid, -- fk
    http_status         numeric,
    http_status_code    text,
    exception_class     text      not null,
    stack_trace         text      not null,
    error_message       text      not null,
    debug_message       text,
    exception_timestamp timestamp not null,
    -- Audit columns
    created_dt          timestamp not null default now(),
    created_by          text      not null,
    updated_dt          timestamp not null default now(),
    updated_by          text      not null
);
create index fk_error_log_1 on error_log (user_id);
create index fk_error_log_2 on error_log (call_log_id);
