package dnhung.susopa.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@Builder
public class DateCheckInfo {
    private Boolean isDateFormat;
    private ZonedDateTime date;
}
