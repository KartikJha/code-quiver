1. Setup the transactions table

```
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,        -- Auto-incrementing primary key
    amount NUMERIC NOT NULL,      -- Transaction amount
    type VARCHAR(255) NOT NULL,   -- Transaction type
    parent_id BIGINT,             -- Optional parent transaction ID
    CONSTRAINT fk_parent_id FOREIGN KEY (parent_id) REFERENCES transactions (id) ON DELETE CASCADE
);
```


2. Load values in env file default values are picked in no env file present

3. start the services by running `go run main.go db.go handlers.go utils.go ` 

4. run `./transactions_api.sh` with different values


