package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.ManufacService;
import dnhung.susopa.entity.ManufacturerEntity;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.ManufacRepository;
import org.springframework.stereotype.Service;

@Service
public class ManufacServiceImpl extends BaseServiceImpl<ManufacturerEntity> implements ManufacService {
    private final ManufacRepository manufacRepository;

    public ManufacServiceImpl(ManufacRepository manufacRepository){
        this.manufacRepository = manufacRepository;
    }

    @Override
    protected BaseRepository<ManufacturerEntity> getBaseRepository() {
        return manufacRepository;
    }
}
