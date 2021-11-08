package dnhung.susopa.Service.impl;
import dnhung.susopa.Service.BaseService;
import dnhung.susopa.repository.BaseRepository;

import java.util.List;

public abstract class BaseServiceImpl<T> implements BaseService<T> {
    protected abstract BaseRepository<T> getBaseRepository();

//    public Page<T> search(SearchReq req){
//        Node rootNode = new RSQLParser().parse(req.getFilter());
//        Specification<T> spec = rootNode.accept(new CustomRsqlVisitor<T>());
//
//        String[] sortList = req.getSort().split(",");
//        Sort.Direction direction = sortList[1].equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
//        Pageable pageable = PageRequest.of(req.getPage(), req.getSize(), direction, sortList[0]);
//        return this.getBaseRepository().findAll(spec, pageable);
//    }

    public List<T> search(){
        return this.getBaseRepository().findByOrderByIdDesc();
    }

    public T create(T t) {
        return this.getBaseRepository().save(t);
    }

    public T update(T t) {
        return this.getBaseRepository().save(t);
    }
    public T getById(Long id){
        return this.getBaseRepository().findById(id).get();
    }

    public void delete(Long id){
        this.getBaseRepository().deleteById(id);
    }
}
