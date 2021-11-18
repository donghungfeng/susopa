package dnhung.susopa.repository;

import dnhung.susopa.entity.OrderProductEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderProductRepository extends BaseRepository<OrderProductEntity> {
    @Query(value = "select * from order_product WHERE order_id =?1", nativeQuery = true)
    List<OrderProductEntity> findAllByOrder(Long id);

    @Query(value = "select * FROM order_product,orderrr WHERE order_product.order_id = orderrr.id AND orderrr.status <> -1 AND order_product.time >=?1 AND order_product.time <=?2 order by time desc", nativeQuery = true)
    List<OrderProductEntity> findAllFromTime(double from, double to);

    @Query(value = "select product_code,product_name,SUM(order_product.count) as count, SUM(order_product.price*order_product.count) as total FROM order_product,orderrr WHERE order_product.order_id = orderrr.id AND orderrr.status <> -1 AND order_product.time >=?1 AND order_product.time <=?2 group by product_code order by count desc ", nativeQuery = true)
    List<Object> findAllGroupFromTime(double from, double to);
}
