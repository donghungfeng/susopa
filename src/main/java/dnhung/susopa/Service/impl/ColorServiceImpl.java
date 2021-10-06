package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.ColorService;
import dnhung.susopa.entity.ColorEntity;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.ColorRepository;
import org.springframework.stereotype.Service;

@Service
public class ColorServiceImpl extends BaseServiceImpl<ColorEntity> implements ColorService {
    private final ColorRepository colorRepository;

    public ColorServiceImpl(ColorRepository colorRepository){
        this.colorRepository = colorRepository;
    }


    @Override
    protected BaseRepository<ColorEntity> getBaseRepository() {
        return colorRepository;
    }
}
