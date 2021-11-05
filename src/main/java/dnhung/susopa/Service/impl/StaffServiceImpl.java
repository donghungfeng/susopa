package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.StaffService;
import dnhung.susopa.entity.StaffEntity;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.StaffRepository;
import org.springframework.stereotype.Service;

@Service
public class StaffServiceImpl extends BaseServiceImpl<StaffEntity> implements StaffService {
    private final StaffRepository staffRepository;

    public StaffServiceImpl(StaffRepository staffRepository){
        this.staffRepository = staffRepository;
    }


    @Override
    protected BaseRepository<StaffEntity> getBaseRepository() {
        return staffRepository;
    }
}
