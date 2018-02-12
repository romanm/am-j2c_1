package com.algoritmed.j2c.amj2c_1;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@PropertySource("classpath:sql2.properties")
public class EhCommonRest  extends DbCommonSql{
	protected static final Logger logger = LoggerFactory.getLogger(EhCommonRest.class);
	protected @Autowired @Qualifier("db2JdbcTemplate") JdbcTemplate db2JdbcTemplate;
	protected @Autowired  @Qualifier("db2ParamJdbcTemplate") NamedParameterJdbcTemplate db2ParamJdbcTemplate;

	@GetMapping("/r/read2_sql_with_param")
	public @ResponseBody Map<String, Object> read2_sql_with_param(
			@RequestParam(value = "sql", required = true) String sql
			,HttpServletRequest request
			) {
		Map<String, Object> map = sqlParamToMap(sql, request);
		logger.info("\n------32------/read2_sql_with_param"
				+ "\n" + map
				);
		read_select(map, env.getProperty(sql), db2ParamJdbcTemplate);
		return map;

	}
}
