package dnhung.susopa.repository;

import dnhung.susopa.entity.OrderServiceEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderServiceRepository extends BaseRepository<OrderServiceEntity> {
    @Query("FROM OrderServiceEntity WHERE time >=?1 AND time <=?2")
    List<OrderServiceEntity> findAllFromTime(double from, double to);
}
