package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.SizeService;
import dnhung.susopa.entity.SizeEntity;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.SizeRepository;
import org.springframework.stereotype.Service;

@Service
public class SizeServiceImpl extends BaseServiceImpl<SizeEntity> implements SizeService {
    private final SizeRepository sizeRepository;

    public SizeServiceImpl(SizeRepository sizeRepository){
        this.sizeRepository = sizeRepository;
    }

    @Override
    protected BaseRepository<SizeEntity> getBaseRepository() {
        return sizeRepository;
    }
}
