package dnhung.susopa.repository;

import dnhung.susopa.entity.OrderServiceEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderServiceRepository extends BaseRepository<OrderServiceEntity> {
    @Query("FROM OrderServiceEntity WHERE time >=?1 AND time <=?2 order by time desc")
    List<OrderServiceEntity> findAllFromTime(double from, double to);

    @Query(value = "select service_code,service_name,SUM(count) as count, SUM(price*count) as total FROM order_service WHERE time >=?1 AND time <=?2 group by service_code order by count desc", nativeQuery = true)
    List<Object> findAllGroupFromTime(double from, double to);
}
