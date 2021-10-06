package dnhung.susopa.api;

import dnhung.susopa.Service.BaseService;
import dnhung.susopa.Service.ProductService;
import dnhung.susopa.entity.ProductEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/product")
public class ProductApi extends BaseApi<ProductEntity> {
    private final ProductService productService;

    public ProductApi(ProductService productService) {
        this.productService = productService;
    }

    @Override
    protected BaseService<ProductEntity> getBaseService() {
        return productService;
    }
}
