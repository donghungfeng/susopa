package dnhung.susopa.repository;

import dnhung.susopa.entity.OrderServiceEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderServiceRepository extends BaseRepository<OrderServiceEntity> {
    @Query(value = "select * from order_service WHERE order_id =?1", nativeQuery = true)
    List<OrderServiceEntity> findAllByOrder(Long id);

    @Query(value = "select * FROM order_service,orderrr WHERE order_service.order_id = orderrr.id AND orderrr.status <> -1 AND order_service.time >=?1 AND order_service.time <=?2 order by time desc", nativeQuery = true)
    List<OrderServiceEntity> findAllFromTime(double from, double to);

    @Query(value = "select * FROM order_service,orderrr WHERE order_service.order_id = orderrr.id AND orderrr.status <> -1 AND order_service.time >=?1 AND order_service.time <=?2 AND staff_id = ?3 order by time desc", nativeQuery = true)
    List<OrderServiceEntity> findAllFromTimeWithStaff(double from, double to, Long id);

    @Query(value = "select service_code,service_name,SUM(order_service.count) as count, SUM(order_service.price*order_service.count) as total FROM order_service,orderrr WHERE order_service.order_id = orderrr.id AND orderrr.status <> -1 AND order_service.time >=?1 AND order_service.time <=?2 group by service_code order by count desc", nativeQuery = true)
    List<Object> findAllGroupFromTime(double from, double to);


}
