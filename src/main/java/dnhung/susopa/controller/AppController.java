package dnhung.susopa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AppController {

//	@Autowired
//	private AppConfig appConfig;
	
	@Autowired
    ResourceLoader resourceLoader;
	
    @RequestMapping(value="/app/{component}/{screen}")
    public String dispatchApp(@PathVariable("component") String sComponent, @PathVariable("screen") String sScreen, @RequestParam(name = "params",required=false) String sParams, Model oModel) {
   		

    	oModel.addAttribute("component", sComponent);
    	oModel.addAttribute("screen", sScreen);
    	oModel.addAttribute("params", sParams);
    	String sView = "app/"+ sComponent +"/" + sScreen;
    	String sFilePath = "templates/"+sView+".html";
    	Resource resource = resourceLoader.getResource("classpath:" + sFilePath);
//    	if (!resource.exists()) {
//    		sView = appConfig.webUrlNotfound;
//    	}

        return sView;
    }
    
    @RequestMapping(value="/")
    public String main() {
//        return appConfig.webUrlHome;
		return "/app/common/login";
    }
}
