package com.algoritmed.j2c.amj2c_1;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class DbCommonRest extends DbCommon {
	@GetMapping("/r/read_sql_with_param")
	public @ResponseBody Map<String, Object> read_sql_with_param(
			@RequestParam(value = "sql", required = true) String sql
			,HttpServletRequest request
			) {
		Map<String, Object> map = sqlParamToMap(sql, request);
		logger.info("------43------/read_sql_with_param"
				+ "\n" + map
				);
		read_select(map, env.getProperty(sql), null);
//		List<Map<String, Object>> list = db1ParamJdbcTemplate.queryForList(env.getProperty(sql_command), map);
//		map.put("list", list);
		return map;
	}
	
	protected void read_select(Map<String, Object> data, String sql_command, Integer i) {
		String nr = null==i?"":(""+i);
		if(sql_command.indexOf("SELECT 'docbody' datatype")==0) {
			List<Map<String, Object>> docbodyList = db1ParamJdbcTemplate.queryForList(sql_command, data);
			if(docbodyList.size()>0) {
				Map<String, Object> docbodyMap = docbodyList.get(0);
				String docbodyStr = (String) docbodyMap.get("docbody");
				Map<String, Object> docbodyStr2Map = stringToMap(docbodyStr);
				docbodyMap.put("docbody", docbodyStr2Map);
				data.put("docbody"+nr, docbodyMap);
			}
		}else{
			List<Map<String, Object>> list = db1ParamJdbcTemplate.queryForList(sql_command, data);
			data.put("list"+nr, list);
		}
	}
	
	@Autowired protected	ObjectMapper objectMapper;
	protected Map<String, Object> stringToMap(String protocolDoc) {
		Map map = null;
		try {
			map = objectMapper.readValue(protocolDoc, Map.class);
		} catch (IOException e) {
			e.printStackTrace();
		}
		if(map==null)
			map = new HashMap<>();
		return map;
	}
	
	private Map<String, Object> sqlParamToMap(String sql, HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		String sql_from_env = env.getProperty(sql);
		map.put(sql, sql_from_env);
		Map<String, String[]> parameterMap = request.getParameterMap();
		map.put("parameterMap", parameterMap);
		for (String key : parameterMap.keySet()) {
			String[] v = parameterMap.get(key);
			String val = v[0];
			map.put(key, val);
		}
		return map;
	}
}
