create type user_role as enum ('CUSTOMER', 'ADMIN');

create table app_user
(
    id         serial primary key,
    email      varchar(255) unique not null,
    password   varchar(255)        not null,
    role       user_role           not null default 'CUSTOMER',
    created_dt timestamp           not null default current_timestamp,
    created_by varchar(255)        not null,
    updated_dt timestamp           not null default current_timestamp,
    updated_by varchar(255)        not null
);

-- SYSTEM BASE TABLES

drop table api_session;
create table api_session
(
    id               uuid               default gen_random_uuid()
        constraint pk_api_session primary key,
    user_id          uuid      not null, -- fk
    role             text      not null, -- purposeful redundancy (app_user.role)
    permissions      text,
    token            text      not null,
    ip_address       text,
    status_active    text      not null,
    start_dt         timestamp not null,
    last_activity_dt timestamp not null,
    expiration_dt    timestamp,
    renew_expiration boolean   not null,
    -- Audit columns
    created_dt       timestamp not null default now(),
    created_by       text      not null,
    updated_dt       timestamp not null default now(),
    updated_by       text      not null
);
create index ix_api_session_1 on api_session (token);

drop table sys_call_log;
create table sys_call_log
(
    id               uuid               default gen_random_uuid()
        constraint pk_call_log primary key,
    transaction_id   text      not null,
    user_id          uuid, -- fk, redundant (api_session.user_id)
    session_id       uuid, -- fk
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
create index fk_call_log_1 on sys_call_log (user_id);
create index fk_call_log_2 on sys_call_log (session_id);

drop table sys_error_log;
create table sys_error_log
(
    id                  uuid               default gen_random_uuid()
        constraint pk_error_log primary key,
    user_id             uuid, -- fk, redundant
    call_log_id         uuid, -- fk
    http_status         text,
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
create index fk_error_log_1 on sys_error_log (user_id);
create index fk_error_log_2 on sys_error_log (call_log_id);
