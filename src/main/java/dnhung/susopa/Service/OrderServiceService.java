package dnhung.susopa.Service;

import dnhung.susopa.entity.OrderServiceEntity;

import java.util.List;

public interface OrderServiceService extends BaseService<OrderServiceEntity> {
    public List<OrderServiceEntity> findAllFromTime(double from, double to);
    public List<OrderServiceEntity> findAllFromTimeWithStaff(double from, double to,Long id);
    public List<Object> findAllGroupFromTime(double from, double to);
    public List<OrderServiceEntity> findAllByOrder(Long id);
}
