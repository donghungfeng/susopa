package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.ColorService;
import dnhung.susopa.entity.ColorEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/color")
public class ColorApi extends BaseApi<ColorEntity> {
    private final ColorService colorService;

    public ColorApi(ColorService colorService) {
        this.colorService = colorService;
    }

    @Override
    protected BaseService<ColorEntity> getBaseService() {
        return colorService;
    }
}
