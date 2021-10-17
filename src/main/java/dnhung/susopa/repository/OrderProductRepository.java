package dnhung.susopa.repository;

import dnhung.susopa.entity.OrderProductEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderProductRepository extends BaseRepository<OrderProductEntity> {
    @Query("FROM OrderProductEntity WHERE time >=?1 AND time <=?2")
    List<OrderProductEntity> findAllFromTime(double from, double to);
}
