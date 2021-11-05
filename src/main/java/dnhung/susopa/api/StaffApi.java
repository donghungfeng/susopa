package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.StaffService;
import dnhung.susopa.entity.StaffEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/staff")
public class StaffApi extends BaseApi<StaffEntity> {
    private final StaffService staffService;

    public StaffApi(StaffService staffService) {
        this.staffService = staffService;
    }

    @Override
    protected BaseService<StaffEntity> getBaseService() {
        return staffService;
    }
}
