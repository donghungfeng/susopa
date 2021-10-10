package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.VourcherService;
import dnhung.susopa.entity.VourcherEntity;
import dnhung.susopa.model.BaseResponse;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.VourcherRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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

    @Override
    public VourcherEntity getByCode(String code) {
        return this.vourcherRepository.findByCode(code);
    }

    @GetMapping("/getbycode/{code}")
    public BaseResponse update(@PathVariable String code){
        return new BaseResponse("00","Lấy thành công",this.vourcherRepository.findByCode(code));
    }
}
