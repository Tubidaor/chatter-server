BEGIN;

TRUNCATE
  chatter_child,
  chatter_words,
  chatter_users
  RESTART IDENTITY CASCADE;

INSERT INTO chatter_users( id, first_name, last_name, user_name, password)
VALUES
  (1, 'juan', 'baltazar', 'tubidaor', '$2a$12$NQSWFrJQivqidekDLcD6iO2vQrAuKMMGozV/8aBjbRI8Ge01ATZhW'),
  (2, 'bob', 'baltazar', 'testuser', '$2a$12$NQSWFrJQivqidekDLcD6iO2vQrAuKMMGozV/8aBjbRI8Ge01ATZhW'),
  (3, 'megan', 'baltazar', 'testuser1', '$2a$12$NQSWFrJQivqidekDLcD6iO2vQrAuKMMGozV/8aBjbRI8Ge01ATZhW'),
  (4, 'mara', 'baltazar', 'testuser2', '$2a$12$NQSWFrJQivqidekDLcD6iO2vQrAuKMMGozV/8aBjbRI8Ge01ATZhW');

INSERT INTO chatter_child (name_, gender, birthdate, parent_id)
VALUES
  ('chumbis', 'female', '02/17/2017', 1),
  ('grounchy ladybug', 'female', '02/17/2019', 1),
  ('chumbawomba', 'female', '07/17/2020', 2),
  ('Faith', 'female', '02/17/2020', 2),
  ('hungry hippo', 'female', '02/17/2020', 3),
  ('mija', 'female', '02/17/2020', 4);

INSERT INTO chatter_words (words, date_created, child_id)
VALUES
  ('papa', '06/30/2017', 1),
  ('mama', '07/30/2017', 1),
  ('pout', '08/30/2017', 1),
  ('love', '08/30/2017', 1),
  ('chumbis', '08/30/2017', 1),
  ('te quiero mucho', '08/30/2017', 1),
  ('abuelita', '10/30/2017', 1),
  ('gracias', '10/30/2017', 1),
  ('agua', '11/30/2017', 1),
  ('manzana', '12/30/2017', 1),
  ('por favor', '1/30/2018', 1),
  ('paloma', '06/30/2018', 1),
  ('mara', '06/30/2018', 1),
  ('simon', '06/30/2018', 1),
  ('trevor', '06/30/2018', 1),
  ('grandpa', '06/30/2018', 1),
  ('mistake', '06/30/2018', 1),
  ('milk', '06/30/2018', 1),
  ('jelly', '06/30/2018', 1),
  ('no', '06/30/2018', 1),
  ('yes', '06/30/2018', 1),
  ('mad', '06/30/2018', 1),
  ('angry', '06/30/2018', 1),
  ('sad', '06/30/2018', 1),
  ('happy', '07/30/2018', 1),
  ('friend', '06/30/2018', 1),
  ('sky', '06/30/2018', 2),
  ('fish', '06/30/2018', 2),
  ('bear', '06/30/2018', 2),
  ('horse', '06/30/2018', 2),
  ('dog', '06/30/2018', 2),
  ('pancake', '06/30/2018', 1),
  ('egg', '06/30/2018', 2),
  ('chocolate', '06/30/2018', 1),
  ('ham', '06/30/2018', 2),
  ('oatmeal', '06/30/2018', 1),
  ('cereal', '06/30/2018', 1),
  ('plate', '06/30/2018', 2),
  ('fork', '06/30/2018', 1),
  ('instead', '06/30/2019', 1),
  ('if', '06/30/2019', 1),
  ('sleep', '06/30/2019', 3),
  ('tired', '06/30/2019', 3),
  ('sun', '06/30/2019', 3);



COMMIT;