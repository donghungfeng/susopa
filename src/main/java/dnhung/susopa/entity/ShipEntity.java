package dnhung.susopa.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "ship", schema = "main", catalog = "")
public class ShipEntity {
    private Long id;
    private Double oneWay;
    private Double twoWay;
    private String note;
    private String name;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "one_way")
    public Double getOneWay() {
        return oneWay;
    }

    public void setOneWay(Double oneWay) {
        this.oneWay = oneWay;
    }

    @Basic
    @Column(name = "two_way")
    public Double getTwoWay() {
        return twoWay;
    }

    public void setTwoWay(Double twoWay) {
        this.twoWay = twoWay;
    }

    @Basic
    @Column(name = "note")
    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShipEntity that = (ShipEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(oneWay, that.oneWay) &&
                Objects.equals(twoWay, that.twoWay) &&
                Objects.equals(note, that.note);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, oneWay, twoWay, note);
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
