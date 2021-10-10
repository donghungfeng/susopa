package dnhung.susopa.repository;

import dnhung.susopa.entity.VourcherEntity;

public interface VourcherRepository extends BaseRepository<VourcherEntity> {
    public VourcherEntity findByCode(String code);
}
