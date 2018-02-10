package com.algoritmed.j2c.amj2c_1;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	protected void mapSqlJoins(Map<String, Object> map, List<Map<String, Object>> listColumns) {
		System.err.println(listColumns);
//			addListWithName("joinColumnsSelect", sqlJoinColumnsSelect, map);
		String joins = "", columns = "";
		Map<Integer, Object> col_aliasMap	= (Map<Integer, Object>) map.get("col_alias");
		if(null==col_aliasMap) {
			col_aliasMap = new HashMap<Integer, Object>();
			map.put("col_alias", col_aliasMap);
		}
		HashMap<String, Object> col_keys = new HashMap<String, Object>();
		for (Map<String, Object> map2 : listColumns) {
			Integer cln_id = (Integer) map2.get("cln_id");
			joins += " " + map2.get("add_joins");
			columns += " " + map2.get("add_columns");
//			String col_alias = (String) map2.get("col_alias");
//			String col_table_name = (String) map2.get("col_table_name");
//			HashMap<Object, Object> m = new HashMap<>();
			map2.remove("add_joins");
			map2.remove("add_columns");
			map2.remove("joins_select");
			col_aliasMap.put(cln_id, map2);
			col_keys.put(""+map2.get("col_key"), map2.get("col_alias"));
		}
		map.put("col_keys", col_keys);
		map.put("add_joins", joins);
		map.put("add_columns", columns);
	}
}
