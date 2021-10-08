package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.VourcherService;
import dnhung.susopa.entity.VourcherEntity;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.VourcherRepository;
import org.springframework.stereotype.Service;

@Service
public class VourcherServiceImpl extends BaseServiceImpl<VourcherEntity> implements VourcherService {
    private final VourcherRepository vourcherRepository;

    public VourcherServiceImpl(VourcherRepository vourcherRepository){
        this.vourcherRepository = vourcherRepository;
    }

    @Override
    protected BaseRepository<VourcherEntity> getBaseRepository() {
        return vourcherRepository;
    }
}
