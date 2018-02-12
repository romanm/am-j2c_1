package com.algoritmed.j2c.amj2c_1;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DbRest extends DbCommon{

//	private @Value("${sql.integer.update}") String sqlIntegerUpdate;
//	private @Value("${sql.string.update}") String sqlStringUpdate;

	@PostMapping("/r/table/save")
	public @ResponseBody Map<String, Object> tableSave(
			@RequestBody Map<String, Object> dbSaveObj
			) {
		logger.info("\n "
				+ "/r/table/save");
		System.err.println(dbSaveObj);
		Map<String, Object> col_alias = (Map) dbSaveObj.get("col_alias");
		Map<String, Object> data = (Map) dbSaveObj.get("data");
		for (String k : data.keySet()) {
			System.err.println(k);
			Map map = (Map) data.get(k);
			for (Object k2 : map.keySet()) {
				System.err.println(k2);
				Map dataMap = (Map) map.get(k2);
				Object value = dataMap.get("value");
				if(value!=null && !value.equals(dataMap.get("oldValue"))){
					System.err.println(dataMap);
					Map col_aliasMap = (Map) col_alias.get(k2);
					System.err.println(col_aliasMap);
					String col_table_name = (String) col_aliasMap. get("col_table_name");
					Map<String, Object> updateMap = new HashMap<String, Object>();
					updateMap.put("data_id", dataMap.get("id"));
					updateMap.put("value", value);
					System.err.println(updateMap);
					db2ParamJdbcTemplate.update(env.getProperty("sql."+ col_table_name+ ".update"), updateMap);
					/*
					if("integer".equals(col_table_name)){
						db1ParamJdbcTemplate.update(sqlIntegerUpdate, updateMap);
					}else
					if("string".equals(col_table_name)){
						db1ParamJdbcTemplate.update(sqlStringUpdate, updateMap);
					}
					 * */
				}
			}
		}
		return dbSaveObj;
	}

//	private @Value("${sql.join_columns.select}") String sqlJoinColumnsSelect;
	private @Value("${sql.table1.select}") String sqlTableSelect;
	@GetMapping(value = "/r/table/select")
	public @ResponseBody Map<String, Object>  tableSelect() {
		Map<String, Object> map		= new HashMap<String, Object>();
		
		System.err.println("-------------------78-----");
		System.err.println(env.getProperty("sql.join_columns.select"));
		
		List<Map<String, Object>> listColumns = 
				db1JdbcTemplate.queryForList(env.getProperty("sql.join_columns.select"));
		
		mapSqlJoins(map, listColumns);

		String sqlTableSelect2 = sqlTableSelect.replace(":add_joins", ""+map.get("add_joins")).replace(":add_columns", ""+map.get("add_columns"));
		System.err.println(sqlTableSelect2);
		addListWithName("tableSelect", sqlTableSelect2, map);
		return map;
	}


	private @Value("${sql.tables.select}") String sqlTablesSelect;
	@GetMapping(value = "/r/tables/select")
	public @ResponseBody Map<String, Object>  tablesSelect() {
		Map<String, Object> map = new HashMap<String, Object>();
		System.err.println("/r/tables/select");
		System.err.println(sqlTablesSelect);
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

}
