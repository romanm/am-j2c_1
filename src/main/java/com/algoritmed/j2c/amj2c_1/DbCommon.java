package com.algoritmed.j2c.amj2c_1;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

@PropertySource("classpath:sql.properties")
public class DbCommon {
	protected static final Logger logger = LoggerFactory.getLogger(DbCommon.class);
	@Autowired protected Environment env;

	protected @Autowired JdbcTemplate db1JdbcTemplate;
	protected @Autowired NamedParameterJdbcTemplate db1ParamJdbcTemplate;

}
