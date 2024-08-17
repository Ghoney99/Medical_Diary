package com.project.teamproject.createForm;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;


@Getter
@Setter
public class UserCreateForm {
    @NotEmpty(message = "You have to write down all the blanks below.")
    @Size(max = 10)
    private String id;

    @NotEmpty(message = "You have to write down all the blanks below.")
    @Size(max = 10)
    private String pw;

    @NotEmpty(message = "You have to write down all the blanks below.")
    @Size(max = 10)
    private String name;
}
