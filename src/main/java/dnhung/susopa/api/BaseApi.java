package dnhung.susopa.api;


import dnhung.susopa.Service.BaseService;
import dnhung.susopa.model.BaseResponse;
import dnhung.susopa.model.SearchReq;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

public abstract class BaseApi<T> {

    protected abstract BaseService<T> getBaseService();

    @GetMapping("/search")
    public BaseResponse search(){
        return new BaseResponse("00","Lấy thành công",this.getBaseService().search());

    }
//    public Page<T> search(@Valid SearchReq req) {
//        return this.getBaseService().search(req);
//    }

    @PostMapping("/create")
    public BaseResponse create(@RequestBody T t){
        return new BaseResponse("00","Cập nhật dữ liệu thành công", this.getBaseService().create(t));
    }

    @PutMapping("/update")
    public BaseResponse update(@RequestBody T t){
        return new BaseResponse("00","Cập nhật thành công",this.getBaseService().update(t));
    }

    @GetMapping("/getbyid/{id}")
    public BaseResponse update(@PathVariable Long id){
        return new BaseResponse("00","Lấy thành công",this.getBaseService().getById(id));
    }

    @GetMapping("/delete/{id}")
    public BaseResponse delete(@PathVariable Long id){
        this.getBaseService().delete(id);
        return new BaseResponse("00","Xóa thành công",id);
    }
}
