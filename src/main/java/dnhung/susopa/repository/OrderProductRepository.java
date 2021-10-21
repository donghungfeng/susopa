package dnhung.susopa.repository;

import dnhung.susopa.entity.OrderProductEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderProductRepository extends BaseRepository<OrderProductEntity> {
    @Query("FROM OrderProductEntity WHERE time >=?1 AND time <=?2 order by time desc")
    List<OrderProductEntity> findAllFromTime(double from, double to);

    @Query(value = "select product_code,product_name,SUM(count) as count, SUM(price*count) as total FROM order_product WHERE time >=?1 AND time <=?2 group by product_code order by count desc ", nativeQuery = true)
    List<Object> findAllGroupFromTime(double from, double to);
}
