package dnhung.susopa.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "orderrr", schema = "main", catalog = "")
public class OrderEntity {
    private Long id;
    private String code;
    private double amount;
    private double received;
    private String status;
    private double time;
    private String customerPhone;
    private String customerName;

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
    @Column(name = "amount")
    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Basic
    @Column(name = "received")
    public double getReceived() {
        return received;
    }

    public void setReceived(double received) {
        this.received = received;
    }

    @Basic
    @Column(name = "status")
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Basic
    @Column(name = "time")
    public double getTime() {
        return time;
    }

    public void setTime(double time) {
        this.time = time;
    }

    @Basic
    @Column(name = "customer_phone")
    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    @Basic
    @Column(name = "customer_name")
    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderEntity that = (OrderEntity) o;
        return id == that.id &&
                Double.compare(that.amount, amount) == 0 &&
                Double.compare(that.received, received) == 0 &&
                Double.compare(that.time, time) == 0 &&
                Objects.equals(code, that.code) &&
                Objects.equals(status, that.status) &&
                Objects.equals(customerPhone, that.customerPhone) &&
                Objects.equals(customerName, that.customerName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, code, amount, received, status, time, customerPhone, customerName);
    }
}
