package dnhung.susopa.Service;

import dnhung.susopa.entity.OrderServiceEntity;

import java.util.List;

public interface OrderServiceService extends BaseService<OrderServiceEntity> {
    public List<OrderServiceEntity> findAllFromTime(double from, double to);
}
