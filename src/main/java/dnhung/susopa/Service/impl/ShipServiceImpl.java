package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.ShipService;
import dnhung.susopa.entity.ShipEntity;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.ShipRepository;
import org.springframework.stereotype.Service;

@Service
public class ShipServiceImpl extends BaseServiceImpl<ShipEntity> implements ShipService {
    private final ShipRepository shipRepository;

    public ShipServiceImpl(ShipRepository shipRepository){
        this.shipRepository = shipRepository;
    }

    @Override
    protected BaseRepository<ShipEntity> getBaseRepository() {
        return shipRepository;
    }
}
