package dnhung.susopa.Service;

import dnhung.susopa.model.SearchReq;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BaseService<T> {

//    public Page<T> search(SearchReq req);
    public List<T> search();
    public T create(T t);
    public T update(T t);
    public T getById(Long id);
    public void delete(Long id);
}
