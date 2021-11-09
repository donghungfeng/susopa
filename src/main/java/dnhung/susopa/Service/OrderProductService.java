package dnhung.susopa.Service;

import dnhung.susopa.entity.OrderProductEntity;
import dnhung.susopa.entity.OrderServiceEntity;

import java.util.List;

public interface OrderProductService extends BaseService<OrderProductEntity> {
    public List<OrderProductEntity> findAllFromTime(double from, double to);
    public List<Object> findAllGroupFromTime(double from, double to);
    public List<OrderProductEntity> findAllByOrder(Long id);
}
