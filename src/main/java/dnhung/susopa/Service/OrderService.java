package dnhung.susopa.Service;

import dnhung.susopa.entity.OrderEntity;

import java.util.List;

public interface OrderService extends BaseService<OrderEntity> {
    public List<OrderEntity> findAllFromTime(double from, double to);
}
