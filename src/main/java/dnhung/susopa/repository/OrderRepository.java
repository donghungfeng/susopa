package dnhung.susopa.repository;

import dnhung.susopa.entity.OrderEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends BaseRepository<OrderEntity> {
    @Query("FROM OrderEntity WHERE time >=?1 AND time <=?2")
    List<OrderEntity> findAllFromTime(double from, double to);

}
