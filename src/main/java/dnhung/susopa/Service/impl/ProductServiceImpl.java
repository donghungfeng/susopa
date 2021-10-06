package dnhung.susopa.Service.impl;

import dnhung.susopa.Service.ProductService;
import dnhung.susopa.entity.ProductEntity;
import dnhung.susopa.repository.BaseRepository;
import dnhung.susopa.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl extends BaseServiceImpl<ProductEntity> implements ProductService {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @Override
    protected BaseRepository<ProductEntity> getBaseRepository() {
        return productRepository;
    }
}
