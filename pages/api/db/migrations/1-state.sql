-- Up

CREATE TABLE State(

    userId TEXT PRIMARY KEY,
    state TEXT not null
);

-- Down

DROP TABLE State;