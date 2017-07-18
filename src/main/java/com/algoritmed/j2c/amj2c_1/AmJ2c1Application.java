package com.algoritmed.j2c.amj2c_1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
@ImportResource("classpath:config-app-spring.xml")
public class AmJ2c1Application {

	public static void main(String[] args) {
		SpringApplication.run(AmJ2c1Application.class, args);
	}
}
