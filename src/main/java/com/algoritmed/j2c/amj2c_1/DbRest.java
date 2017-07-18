package com.algoritmed.j2c.amj2c_1;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DbRest {
	private static final Logger logger = LoggerFactory.getLogger(DbRest.class);
	
	private @Value("${sql.create_tables.select}") String sqlCreateTableSelect;
	@GetMapping(value = "/r/create_tables/select")
	public @ResponseBody Map<String, Object>  createTableSelect() {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Map<String, Object>> createTableSelect = db1JdbcTemplate.queryForList(sqlCreateTableSelect);
		map.put("createTableSelect", createTableSelect);
		return map;
	}

	protected @Autowired JdbcTemplate db1JdbcTemplate;
	protected @Autowired NamedParameterJdbcTemplate db1ParamJdbcTemplate;

}
