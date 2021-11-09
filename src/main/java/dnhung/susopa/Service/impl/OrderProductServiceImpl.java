package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.OrderProductService;
import dnhung.susopa.entity.OrderProductEntity;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.OrderProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderProductServiceImpl extends BaseServiceImpl<OrderProductEntity> implements OrderProductService {
    private final OrderProductRepository orderProductRepository;

    public OrderProductServiceImpl(OrderProductRepository orderProductRepository){
        this.orderProductRepository = orderProductRepository;
    }

    @Override
    protected BaseRepository<OrderProductEntity> getBaseRepository() {
        return orderProductRepository;
    }

    @Override
    public List<OrderProductEntity> findAllFromTime(double from, double to) {
        return this.orderProductRepository.findAllFromTime(from,to);
    }

    @Override
    public List<Object> findAllGroupFromTime(double from, double to) {
        return this.orderProductRepository.findAllGroupFromTime(from,to);
    }

    @Override
    public List<OrderProductEntity> findAllByOrder(Long id) {
        return this.orderProductRepository.findAllByOrder(id);
    }
}
