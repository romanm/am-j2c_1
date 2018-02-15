package com.algoritmed.j2c.amj2c_1.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

@Component
public class UrlFilter implements Filter{

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
        String url = ((HttpServletRequest)request).getRequestURL().toString();
        String queryString = ((HttpServletRequest)request).getQueryString();
        System.err.println("--30-- "+url + (null==queryString?"":"?"+queryString));
		chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}
	@Override
	public void destroy() {
	}

}
