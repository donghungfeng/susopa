package dnhung.susopa.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "vourcher", schema = "main", catalog = "")
public class VourcherEntity {
    private Long id;
    private String code;
    private String type;
    private Short percent;
    private Double money;
    private short usage;
    private Double outdate;
    private String note;

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
    @Column(name = "code")
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Basic
    @Column(name = "type")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Basic
    @Column(name = "percent")
    public Short getPercent() {
        return percent;
    }

    public void setPercent(Short percent) {
        this.percent = percent;
    }

    @Basic
    @Column(name = "money")
    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    @Basic
    @Column(name = "usage")
    public short getUsage() {
        return usage;
    }

    public void setUsage(short usage) {
        this.usage = usage;
    }

    @Basic
    @Column(name = "outdate")
    public Double getOutdate() {
        return outdate;
    }

    public void setOutdate(Double outdate) {
        this.outdate = outdate;
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
        VourcherEntity that = (VourcherEntity) o;
        return id == that.id &&
                usage == that.usage &&
                Objects.equals(code, that.code) &&
                Objects.equals(type, that.type) &&
                Objects.equals(percent, that.percent) &&
                Objects.equals(money, that.money) &&
                Objects.equals(outdate, that.outdate) &&
                Objects.equals(note, that.note);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, code, type, percent, money, usage, outdate, note);
    }
}
