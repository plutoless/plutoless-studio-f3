CREATE TABLE IF NOT EXISTS menus (
        mid INTEGER NOT NULL AUTO_INCREMENT,
        title VARCHAR(30),
        addr VARCHAR(50),
        PRIMARY KEY(mid)
);

INSERT INTO `studio`.`menus` (`mid`, `title`, `addr`) VALUES (NULL, 'Post', 'post');
INSERT INTO `studio`.`menus` (`mid`, `title`, `addr`) VALUES (NULL, 'Project', 'project');