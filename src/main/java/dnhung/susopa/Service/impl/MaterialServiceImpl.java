package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.MaterialService;
import dnhung.susopa.entity.MaterialEntity;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.MaterialRepository;
import org.springframework.stereotype.Service;

@Service
public class MaterialServiceImpl extends BaseServiceImpl<MaterialEntity> implements MaterialService {
    private final MaterialRepository materialRepository;

    public MaterialServiceImpl(MaterialRepository materialRepository){
        this.materialRepository = materialRepository;
    }


    @Override
    protected BaseRepository<MaterialEntity> getBaseRepository() {
        return materialRepository;
    }
}
