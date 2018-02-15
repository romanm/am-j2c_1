package com.algoritmed.amj2c_1;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DbProgramRest extends DbCommon{

	@GetMapping(value = "/r/program_folder")
	public @ResponseBody List<Map<String, Object>>  readProgramFolders() {
		String sql = env.getProperty("sql.program_folder.select");
		List<Map<String, Object>> queryForList = db1JdbcTemplate.queryForList(sql);
		return queryForList;
	}

	@GetMapping(value = "/r/program/{programId}")
	public @ResponseBody Map<String, Object>  readProgram(@PathVariable Integer programId) {
		logger.info("\n "
				+ "/r/program/{programid}");
		Map<String, Object> map		= new HashMap<String, Object>();
		map.put("programId", programId);
		return map;
	}

	@GetMapping(value = "/r/program_dir/{folderId}")
	public @ResponseBody Map<String, Object>  readProgramDir(@PathVariable Integer folderId) {
		Map<String, Object> map		= new HashMap<String, Object>();
		map.put("folderId", folderId);
		return map;
	}
		
}
