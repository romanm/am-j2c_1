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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DbRest {
	private static final Logger logger = LoggerFactory.getLogger(DbRest.class);

	@PostMapping("/r/table/save")
	public @ResponseBody Map<String, Object> tableSave(
			@RequestBody Map<String, Object> dbSaveObj
			) {
		logger.info("\n "
				+ "/r/table/save");
		System.err.println(dbSaveObj);
		return dbSaveObj;
	}

	private @Value("${sql.join_columns.select}") String sqlJoinColumnsSelect;
	private @Value("${sql.table.select}") String sqlTableSelect;
	@GetMapping(value = "/r/table/select")
	public @ResponseBody Map<String, Object>  tableSelect() {
		Map<String, Object> map		= new HashMap<String, Object>();
		Map<Integer, String> col_alias	= new HashMap<Integer, String>();
		List<Map<String, Object>> listColumns = 
			addListWithName("joinColumnsSelect", sqlJoinColumnsSelect, map);
		String joins = "",columns = "";
		for (Map<String, Object> map2 : listColumns) {
			Integer cln_id = (Integer) map2.get("cln_id");
			joins += " " + map2.get("joins");
			columns += " " + map2.get("columns");
			String ca = (String) map2.get("col_alias");
			col_alias.put(cln_id, ca);
		}
		map.put("col_alias", col_alias);
		String sqlTableSelect2 = sqlTableSelect.replace(":joins", joins).replace(":columns", columns);
		System.err.println(sqlTableSelect2);
		addListWithName("tableSelect", sqlTableSelect2, map);
		return map;
	}
	
	private @Value("${sql.tables.select}") String sqlTablesSelect;
	@GetMapping(value = "/r/tables/select")
	public @ResponseBody Map<String, Object>  tablesSelect() {
		Map<String, Object> map = new HashMap<String, Object>();
		addListWithName("tablesSelect", sqlTablesSelect, map);
		return map;
	}

	private @Value("${sql.create_tables.select}") String sqlCreateTableSelect;
	@GetMapping(value = "/r/create_tables/select")
	public @ResponseBody Map<String, Object>  createTableSelect() {
		Map<String, Object> map = new HashMap<String, Object>();
		addListWithName("createTableSelect", sqlCreateTableSelect, map);
		return map;
	}

	private List<Map<String, Object>> addListWithName(String name, String select, Map<String, Object> map) {
		List<Map<String, Object>> queryForList = db1JdbcTemplate.queryForList(select);
		map.put(name, queryForList);
		return queryForList;
	}

	protected @Autowired JdbcTemplate db1JdbcTemplate;
	protected @Autowired NamedParameterJdbcTemplate db1ParamJdbcTemplate;

}
