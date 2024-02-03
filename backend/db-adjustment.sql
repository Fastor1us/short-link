--========================================================================== 
-- создаём схему
CREATE SCHEMA "short-link" AUTHORIZATION postgres;

-- создаём табилцу
CREATE TABLE "short-link".links (
  id SERIAL PRIMARY KEY,
  original_link varchar(500),
  shortened_link varchar(35)
);
--========================================================================== 

--========================================================================== 
-- создаём пользователя
DO $$
DECLARE
  username text:= 'express';
  password text:= 'gfhjkmr<L';
  database_name text:= 'postgres';
  schema_name text:= 'short-link';
BEGIN
--Создание пользователя
  EXECUTE format('CREATE USER %I WITH PASSWORD %L', username, password);
--Назначение привилегий на базу данных
  EXECUTE format('GRANT CONNECT ON DATABASE %I TO %I', database_name, username);
--Назначение привилегий на схему
  EXECUTE format('GRANT USAGE ON SCHEMA %I TO %I', schema_name, username);
--Назначение привилегий на все таблицы в схеме
  EXECUTE format('GRANT SELECT, INSERT, DELETE, UPDATE ON ALL TABLES IN SCHEMA %I TO %I', schema_name, username);
--Даём возмонжость использовать SEQUENCES
  EXECUTE format('GRANT USAGE ON ALL SEQUENCES IN SCHEMA %I TO %I', schema_name, username);
END;
$$;

-- выдаём права пользователю
GRANT CREATE, USAGE ON SCHEMA "short-link" TO express;
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE "short-link".links TO express;
GRANT USAGE ON ALL SEQUENCES IN schema "short-link" to express;
--========================================================================== 

--========================================================================== 
-- триггер
CREATE OR REPLACE FUNCTION "short-link".delete_lowest_id_link()
RETURNS TRIGGER AS
$$
BEGIN
    IF (SELECT COUNT(*) FROM "short-link".links) > 5 THEN
        DELETE FROM "short-link".links 
        WHERE id = (SELECT id FROM "short-link".links ORDER BY id LIMIT 1);
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER delete_lowest_id_trigger
AFTER INSERT ON "short-link".links
FOR EACH ROW
EXECUTE FUNCTION "short-link".delete_lowest_id_link();
--========================================================================== 
